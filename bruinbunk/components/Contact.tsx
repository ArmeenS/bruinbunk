function Contact() {
    return (
        <div className="">
            <div className="text-white text-4xl font-bold mb-1 pt-8">
                Contact
            </div>
            <div id={"contact"} className="flex flex-wrap mt-10 gap-6">
                <div className="inline-block w-80">
                    <div className="text-white font-medium mb-6">Email: bruin@bruinbunk.com</div>
                </div>
                {/*
                <div className="inline-block w-80">
                    <div className="text-white font-medium text-sm">Phone</div>
                    <div className="text-white">(559) 355-4751</div>
                </div>
                */}
            </div>
        </div>
    );
}

export default Contact;