import './contact.css'

const Contact = () => {
    return (
        <section className="contact" id="contact">
            <h1 className="heading"><span>contact</span> us </h1>
            <div className="row">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6450905179696!2d106.71272359902606!3d10.843391032642387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a89e3fbf17%3A0x4762971c337bfde4!2sZodinet%20Technology!5e0!3m2!1svi!2s!4v1672808470356!5m2!1svi!2s" width="600" height="450" loading="lazy"></iframe>
                <form action="">
                    <h3>get in touch</h3>
                    <div className="inputBox">
                        <span className="fas fa-user"></span>
                        <input type="text" placeholder="name" />
                    </div>
                    <div className="inputBox">
                        <span className="fas fa-envelope"></span>
                        <input type="email" placeholder="email" />
                    </div>
                    <div className="inputBox">
                        <span className="fas fa-phone"></span>
                        <input type="number" placeholder="number" />
                    </div>
                    <input type="submit" value="contact now" className="btn" />
                </form>
            </div>
        </section>
    )
}

export default Contact