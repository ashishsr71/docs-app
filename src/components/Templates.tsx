import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components
const NextArrow = ({ onClick }:{onClick:()=>void}) => (
  <div
    className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-2xl text-gray-700"
    onClick={onClick}
  >
    ➡️
  </div>
);

const PrevArrow = ({ onClick }:{onClick:()=>void}) => (
  <div
    className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-2xl text-gray-700"
    onClick={onClick}
  >
    ⬅️
  </div>
);

const Templates = () => {
  const templates = [
    {
      id: 1,
      label: "Blank Document",
      imgUri: "https://www.gstatic.com/images/icons/material/system/2x/add_box_blue_48dp.png",
    },
    {
      id: 2,
      label: "Software development...",
      imgUri: "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png",
    },
    {
      id: 3,
      label: "Project proposal",
      imgUri: "https://ssl.gstatic.com/docs/templates/thumbnails/15bd5e4a-2340-430a-8587-b7e57bc3eb1a.png",
    },
    {
      id: 4,
      label: "Business letter",
      imgUri: "https://ssl.gstatic.com/docs/templates/thumbnails/1373760.png",
    }, {
        id: 1,
        label: "Blank Document",
        imgUri: "https://www.gstatic.com/images/icons/material/system/2x/add_box_blue_48dp.png",
      },
      {
        id: 2,
        label: "Software development...",
        imgUri: "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png",
      },
      {
        id: 3,
        label: "Project proposal",
        imgUri: "https://ssl.gstatic.com/docs/templates/thumbnails/15bd5e4a-2340-430a-8587-b7e57bc3eb1a.png",
      },
      {
        id: 4,
        label: "Business letter",
        imgUri: "https://ssl.gstatic.com/docs/templates/thumbnails/1373760.png",
      },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={()=>{}}/>,
    prevArrow: <PrevArrow onClick={()=>{}}/>,
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

  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <h3 className="font-medium text-lg mb-4">Start a new document</h3>

        <div className="relative">
          <Slider {...settings}>
            {templates.map(({ label, id, imgUri }) => (
              <div key={id} className="px-[4px]">
                <div className="aspect-[3/4] w-[160px] mx-auto rounded-md overflow-hidden shadow hover:shadow-md hover:border-blue-500 hover:bg-blue-50 transition bg-white border cursor-pointer">
                  <div className="aspect-[3/4] flex flex-col gap-y-2.5">
                    <button
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
  );
};

export default Templates;
