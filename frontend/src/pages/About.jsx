import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          ABOUT <span className='text-gray-700 font-medium'>US</span>
        </p>
      </div>
      <div className='mt-10 flex flex-col md:flex-row gap-12'>
        <img
          className='w-full md:max-w-[350px]'
          src={assets.about_image}
          alt=''
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor laudantium, cumque, wiefhbiowuehf at necessitatibus consequatur distinctio blanditiis quod consequuntur molestias sed dolorum, repudiandae nihil labore facere deleniti vel aut maiores quam!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptate facere, autem fugit quis itaque totam iste sint sunt consectetur qui nostrum veniam pariatur minus harum. In rerum adipisci maiores?
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam vel sint, at fugiat alias illum incidunt eum labore soluta sed praesentium? Architecto eius sint aliquam voluptates unde consectetur natus numquam.
          </p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>
          WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span>{" "}
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white duration-300 transition-all  cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border px-10 md:px16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white duration-300 transition-all  cursor-pointer">
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="border px-10 md:px16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white duration-300 transition-all  cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
