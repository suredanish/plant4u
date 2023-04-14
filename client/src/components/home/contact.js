import axios from 'axios';
import React, { useState } from "react";

const Contact = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [subject, setSubject] = useState()
    const [message, setMessage] = useState()

    const submit = async() => {
    
        const body = {
            name: name,
            email: email,
            subject: subject,
            message: message
        }
    
        const response = await axios.post('http://localhost:3000/api/contact', body, { 
            headers: {
                "Content-Type": "application/json",
             }
         });

    }

    return (
        <body>
        <main id="main">
            <section id="contact" class="contact mb-5">
            <div class="container" data-aos="fade-up">

                <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h1 class="page-title">Contact us</h1>
                </div>
                </div>

                <div class="row gy-4">

                <div class="col-md-12">
                    <div class="info-item">
                    <i class="bi bi-envelope"></i>
                    <h3>Email</h3>
                    <p><a href="mailto:info@example.com">info@plant4u.in</a></p>
                    <p>Our Office: HN: 432, Sita saran road jamuna vihar khatauli, UP (251201)</p>
                    </div>
                </div>

                </div>

                <div class="form mt-5">
                <form onSubmit={submit} class="php-email-form">
                    <div class="row">
                    <div class="form-group col-md-6">
                        <input type="text" name="name" class="form-control" id="name" onChange={(e) => {setName(e.target.value)}} placeholder="Your Name" required />
                    </div>
                    <div class="form-group col-md-6">
                        <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    </div>
                    <div class="form-group">
                    <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} required />
                    </div>
                    <div class="form-group">
                    <textarea class="form-control" name="message" rows="5" placeholder="Message" onChange={(e) => setMessage(e.target.value)} required></textarea>
                    </div>
                    <div class="my-3">
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message">Your message has been sent. Thank you!</div>
                    </div>
                    <div class="text-center"><button type="submit" onSubmit={submit}>Send Message</button></div>
                </form>
                </div>

            </div>
            </section>

        </main>

        </body>
    )
}

export default Contact;