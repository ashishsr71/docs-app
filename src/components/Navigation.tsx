import Logo from '../assets/logo.svg'


const Navigation = () => {
  return (
    <div className='w-full h-full flex justify-between'>
        <div className='flex items-center'>
        <img src={Logo} alt='logo' style={{width:36,height:36}}/>
        <span>Docs</span>
        </div>
        <button 
        className='bg-neutral-500 rounded-sm p-2 mr-3 cursor-pointer'
        style={{alignSelf:"center"}}
        >login</button>
    </div>
  )
}

export default Navigation