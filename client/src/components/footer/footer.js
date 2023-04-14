import React from "react";
const footer = () => {


    return (
        <footer class="bg-dark text-center text-white">

            <div class="container p-4">

                {/* <section class="mb-4" style={{color: 'white'}}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
                    repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
                    eum harum corrupti dicta, aliquam sequi voluptate quas.
                </p>
                </section> */}

                <section>

                <div class="row">

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0" style={{display: "flex", flexDirection: "column"}}>
                        <h5 class="text-uppercase" style={{ paddingRight: "100px" }}>Links</h5>

                        <ul class="mb-0" style={{display: "flex", flexDirection: "column", marginLeft: "4rem"}}>
                            <li>
                            <a href="/privacy-policy" class="text-white" style={{float:"left"}}>Privacy Policy</a>
                            </li>
                            <li>
                            <a href="/refund" class="text-white" style={{float:"left"}}>Return And Refund Policy</a>
                            </li>
                            <li>
                            <a href="/terms-condition" class="text-white" style={{float:"left"}}>Terms And Condition</a>
                            </li>
                            <li>
                            <a href="/contact" class="text-white" style={{float:"left"}}>Contact Us</a>
                            </li>
                            <li>
                            <a href="/about" class="text-white" style={{float:"left"}}>About Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Links</h5>

                    <ul class="list-unstyled mb-0">
                        <li>
                        <a href="#!" class="text-white">Link 1</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 2</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 3</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 4</a>
                        </li>
                    </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Links</h5>

                    <ul class="list-unstyled mb-0">
                        <li>
                        <a href="#!" class="text-white">Link 1</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 2</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 3</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 4</a>
                        </li>
                    </ul>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Links</h5>
                    <ul class="list-unstyled mb-0">
                        <li>
                        <a href="#!" class="text-white">Link 1</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 2</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 3</a>
                        </li>
                        <li>
                        <a href="#!" class="text-white">Link 4</a>
                        </li>
                    </ul>
                    </div> */}

                </div>

                </section>

            </div>

        <div class="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            © 2023 Copyright:
            <a class="text-white" href="https;//plant4u.in/"> Plant4u</a>
        </div>

        </footer>
    )
}
export default footer