export default function Contact() {
    //Here we want to have a contact page that will be like a google form but embedded in the page
    return (
        <div className={"bg-slate-950 pb-2 border-t-2"}>
            <div className={"w-full flex justify-center flex-col items-start pl-5 sm:pl-28"}>
                <div className={"w-full flex flex-col pr-5 sm:pr-28"}>
                    <h2 className="mb-8 mt-8 lg:mb-12 lg:mt-8 text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
                        Contact <span className={"text-green-300"}>Us </span>
                    </h2>

                    {/*Start of the form*/}

                    <div className={"flex flex-row w-full"}>
                        <form className={"aos-init aos-animate"} data-aos={"fade-right"} data-aos-duration={1000}>
                            <label className={"pr-4"} htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name"/><br/>

                            <div className="mb-5"></div>

                            <label className={"pr-4"} htmlFor="email">Email:</label>
                            <input type="text" id="email" name="email"/><br/><br/>

                            <div className="mb-5"></div>

                            <label className={"pr-4"} htmlFor="message">Message:</label>
                            <textarea id="message" name="message"/><br/>

                            <button className={"bg-green-700 p-3 hover:bg-green-600 mt-10"}>Submit</button>
                            <p></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}