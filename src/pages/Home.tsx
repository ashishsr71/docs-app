import List from "../components/List";
import Navigation from "../components/Navigation"
import Templates from "../components/Templates"



const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
           <Navigation/>
        </div>
        <div className="mt-16">
        <Templates/>
        </div>
        <List/>
        <div className="mt-12"></div>
    </div>
  )
};

export default Home;