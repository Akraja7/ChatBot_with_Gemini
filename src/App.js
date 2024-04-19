import { useState } from "react";
import './index.css';

const App = () => {
    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const [chatHistory, setchatHistory] = useState([])
    const surpriseOptions = [
        'Is Messi the Goat?',
        'did Neymar surpassed pele?',
        'How to shoot the football with power?',
        'Is Cristiano Ronaldo the goat?',
        "What is the value of pi?",
        "how to shoot a football with curve?",

    ]
    const surprise = () => {
        const randomvalue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
        setValue(randomvalue)
    }
    const getResponse = async () => {
        if (!value) {
            setError("Error! Ask a question first")
            return
        }
        try {
            const options = {
                method: 'Post',
                body: JSON.stringify({
                    history: chatHistory,
                    message: value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch('http://localhost:8000/gemini', options)
            const data = await response.text()
            console.log(data)
            setchatHistory(oldChatHistory => [...oldChatHistory, {
                role: "user",
                parts: value
            },
            {
                role: "model",
                parts: data
            }
            ])
            setValue("")
        }
        catch (error) {
            setError("something went wrong ! please try again if possible")
        }
    }
    const clear = () => {
        setValue("")
        setError("")
        setchatHistory([])
    }
    return (

        <div className="app">
            <p className="p">What do you want to know?</p>
            <button className="suprise" onClick={surprise} disabled={!chatHistory}>Surpise</button>
            <div className="input-container">
                <input
                    value={value}
                    placeholder={"Write something here?"}
                    onChange={(e) => setValue(e.target.value)}
                />
                {!error && <button onClick={getResponse} className="button">ASK ME</button>}
                {error && <button onClick={clear} className="button">CLEAR</button>}

            </div>
            {error && <h1>{error}</h1>}
            <div className="search-result">
                {chatHistory.map((chatItem, _index) => <div key={_index}>
                    <p className="answer">{chatItem.role} : {chatItem.parts}</p>
                </div>)}
            </div>
            {/* <section className="contact" id="contact">
                    <h2 className="heading">Contact <span>Me!</span></h2>
                    <form action="#">
                        <div className="input-box">
                            <input type="text" placeholder="Full Name"/>
                            <input type="email" placeholder="Email Address"/>
                        </div>
                        <div className="input-box">
                            <input type="Number" placeholder="Mobile Number"/>
                            <input type="text" placeholder="Subject"/>
                        </div>
                        <textarea name="" id="" cols="30" rows="10" placeholder="Your Message"></textarea>
                        <input type="submit" value="send Message" className="btn" placeholder="YOur message"/>
                    </form>

                </section> */}
        </div>

    );
}

export default App;
