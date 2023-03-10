const success = ()=>{
    return (
                <div>
                  <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet" />
                  <style dangerouslySetInnerHTML={{__html: "\n      body {\n        text-align: center;\n        padding: 40px 0;\n        background: #EBF0F5;\n      }\n        h1 {\n          color: #88B04B;\n          font-family: \"Nunito Sans\", \"Helvetica Neue\", sans-serif;\n          font-weight: 900;\n          font-size: 40px;\n          margin-bottom: 10px;\n        }\n        p {\n          color: #404F5E;\n          font-family: \"Nunito Sans\", \"Helvetica Neue\", sans-serif;\n          font-size:20px;\n          margin: 0;\n        }\n      i {\n        color: #9ABC66;\n        font-size: 100px;\n        line-height: 200px;\n        margin-left:-15px;\n      }\n      .card {\n        background: white;\n        padding: 60px;\n        border-radius: 4px;\n        box-shadow: 0 2px 3px #C8D0D8;\n        display: inline-block;\n        margin: 0 auto;\n      }\n    " }} />
                  <div className="card">
                    <div style={{borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto'}}>
                      <i className="checkmark">✓</i>
                    </div>
                    <h1>Success</h1> 
                    <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
                  </div>
                </div>
              );
}



    export default success;