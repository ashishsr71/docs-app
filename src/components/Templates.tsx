import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/useAuth";
import { useNavigate } from "react-router-dom";


const NextArrow = ({ onClick }: { onClick: () => void }) => (
  <div
    className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-2xl text-gray-700"
    onClick={onClick}
  >
    ➡️
  </div>
);

const PrevArrow = ({ onClick }: { onClick: () => void }) => (
  <div
    className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-2xl text-gray-700"
    onClick={onClick}
  >
    ⬅️
  </div>
);


type ModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  content?:string
};

const Modal: React.FC<ModalProps> = ({ open, setOpen ,content}) => {
  const {token,currentRole,userId}=useAuthStore();
  const role=currentRole==userId?"personal":"organization";
  const [title, setTitle] = useState("");
const type=role;
  
  const navigate=useNavigate();
  const handleAccept = async() => {
    console.log("Title:", title);
    console.log("Type:", type);
    console.log("content",content)
    const {data}=await axios.post(`${import.meta.env.VITE_API}/api/v1/user/docs`,{docName:title
      ,type,organizationId:currentRole!==userId?currentRole:null,initalContent:content
    },{headers:{access_token:token},withCredentials:true});
    console.log(data)
    setOpen(false);
    navigate(`/${data._id}`)
    
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Document
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          
          <div className="p-4 md:p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
                placeholder="Enter title"
              />
            </div>

            <div>
              <span>{role}</span>
              {/* <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
              >
                <option value={role}>{role}</option>
               
              </select> */}
            </div>
          </div>

          
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={()=>{handleAccept()}}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
            <button
              onClick={() => setOpen(false)}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Templates: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
const [content,setContent]=useState("");
  const templates = [
    {
      id: 1,
      label: "Blank Document",
      imgUri:
        "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png",
        initialContent:""
    },
    {
      id: 2,
      label: "Software development...",
      imgUri:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
        initialContent:`<h1>Jane Doe</h1>
<p><strong>Email:</strong> jane.doe@example.com | <strong>Phone:</strong> (123) 456-7890</p>
<h2>Experience</h2>
<ul>
  <li><strong>Frontend Developer</strong> at Tech Corp (2021–Present)</li>
  <li><strong>Web Intern</strong> at Creative Agency (2020–2021)</li>
</ul>
<h2>Skills</h2>
<p>React, TypeScript, CSS, Git, REST APIs</p>`
    },
    
    {
      id: 3,
      label: "Project proposal",
      imgUri:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        initialContent:`<h1>Team Sync - April 2025</h1>
<h2>Attendees</h2>
<ul>
  <li>Jane Doe</li>
  <li>John Smith</li>
  <li>Emily Nguyen</li>
</ul>
<h2>Agenda</h2>
<ol>
  <li>Project updates</li>
  <li>Upcoming deadlines</li>
  <li>Team feedback</li>
</ol>
<h2>Notes</h2>
<p>- Project Alpha is on track for release.<br>- Need designs finalized by Friday.</p>
`
    },
    {
      id: 4,
      label: "Business letter",
      imgUri: "https://images.unsplash.com/photo-1581092919531-1c39e8a03f98?auto=format&fit=crop&w=800&q=80",
      initialContent:`<h1>🌟 April Updates from Our Team</h1>
<p>Hello friends,</p>
<p>Here's what's new this month:</p>
<ul>
  <li>🎉 We launched our new feature: Real-time chat!</li>
  <li>📊 Our analytics dashboard got a fresh redesign.</li>
</ul>
<p>Thanks for being with us,<br><strong>— The Dev Team</strong></p>
`
    },
    {
      id: 5,
      label: "Business letter",
      imgUri: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
      initialContent:`<h1>Introducing the SmartPad Pro</h1>
<p>The next-generation note-taking device designed for productivity.</p>
<h2>Features</h2>
<ul>
  <li>🖊️ Ultra-responsive stylus</li>
  <li>📁 Cloud sync with all your devices</li>
  <li>🔋 20-hour battery life</li>
</ul>
<p><strong>Order now</strong> and get 20% off your first purchase!</p>
`
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  useEffect(()=>{
   if(content.length>0){
    setOpen(true)
   }
  },[content])
  return (
    <>
      <Modal open={open} setOpen={setOpen} content={content} />
      <div className="bg-[#F1F3F4]">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <h3 className="font-medium text-lg mb-4">Start a new document</h3>
          <div className="relative">
            <Slider {...settings}>
              {templates.map(({ label, id, imgUri,initialContent }) => (
                <div key={id} className="px-[4px]">
                  <div className="aspect-[3/4] w-[160px] mx-auto rounded-md overflow-hidden shadow hover:shadow-md hover:border-blue-500 hover:bg-blue-50 transition bg-white border cursor-pointer">
                    <div className="aspect-[3/4] flex flex-col gap-y-2.5">
                      <button
                        onClick={() => {
                         
                           setContent(initialContent)
                        }}
                        style={{
                          backgroundImage: `url(${imgUri})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        className="size-full cursor-pointer hover:border-blue-50 hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                      />
                    </div>
                  </div>
                  <p className="text-sm mt-2 font-medium truncate text-center">
                    {label}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Templates;
