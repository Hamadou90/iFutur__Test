import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';


export default function Home() {
  const [contents, setContents] = useState('');
  const [hlights, setHlights] = useState([]);
  const [resultHlights, setResultHlights] = useState('');

  function createMarkup(data) {
    return { __html: data };
  }


  const handleEnter1 = async (E) => {
    return '<button>Foo</button>';
  }

  const handleChange = async (E) => {
    console.log(contents, hlights)
    if (E.target.name === 'contents') {
      setContents(E.target.value);
    }
    if (E.target.name === 'hlights') {
      setHlights(E.target.value);
    }
  }

  const handleSubmit = async (E) => {
    E.preventDefault();
    const data = { contents, hlights };
    
    let jsonData = JSON.parse(JSON.stringify(hlights));

    // For the 
    const matches = jsonData.match(/\d+/g);

    // For the Comments
    const matchesToolTipText = jsonData.match(/"(.*?)"/g);
    
    if (matchesToolTipText) {
      let arrayToolTip = [];
      let toolTipCoordinates = [];
      for (let i = 0; i < matchesToolTipText.length; ++i) {
        let match = matchesToolTipText[i];
        
        let substring = match.substring(1, match.length - 1).toString(); // quotation mark removing
        arrayToolTip.push(substring);
      }
      
      matches.forEach(element => {
        toolTipCoordinates.push(Number(element));
      });

      // Processing Text Section Start
      let paraContents = contents.replaceAll('\n', '<p></p>');

      let markedContents = paraContents.substring(0, Number(toolTipCoordinates[0])) + '<mark style=\"background-color:yellowgreen\" className={styles.toolTip}>' + paraContents.substring(Number(toolTipCoordinates[0]) - 1, Number(toolTipCoordinates[1])) + '</mark>' + paraContents.substring(Number(toolTipCoordinates[1]), Number(toolTipCoordinates[2])) + '<mark style=\"background-color:orange"\>' + paraContents.substring(Number(toolTipCoordinates[2]) - 1, Number(toolTipCoordinates[3])) + '</mark>' + paraContents.substring(Number(toolTipCoordinates[3]), Number(toolTipCoordinates[4])) + '<mark style=\"background-color:violet"\>' + paraContents.substring(Number(toolTipCoordinates[4]) - 1, Number(toolTipCoordinates[5])) + '</mark>' + paraContents.substring(Number(toolTipCoordinates[5]));
      // Processing Text Section End

      setResultHlights(markedContents);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Test i-Futur</title>
        <meta name="description" content="Single page application for the test of i-Futur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ marginTop: "20px" }}>
        <section className={styles.section_flex}>
          <div className={styles.fifty}>
            <form onSubmit={handleSubmit} method="POST">
              <div>
                <label htmlFor="Contents">The Content</label> <br />
                <textarea onChange={handleChange} value={contents} name="contents" id="contents" cols="50" rows="10"></textarea>
              </div>
              <div>
                <label htmlFor="hlights">The highlights</label> <br />
                <textarea onChange={handleChange} value={hlights} name="hlights" id="hlights" cols="50" rows="10"></textarea>
              </div>
              <input type="submit" value="Convert" />
            </form>
          </div>
          <div className={styles.fifty_right}>
            <label htmlFor="resultHighlights">The Highlighted</label> <br />
            <div className={styles.bordering}>
              {resultHlights && resultHlights !== '' &&
                <div dangerouslySetInnerHTML={createMarkup(resultHlights)}></div>
              }
            </div>
          </div>
        </section>

        {/* <section>
          <p>Lorem ipsum dolor sit amet, <mark color='green'> consectetur adipiscing elit. </mark>Maecenas consectetur malesuada velit, sit amet porta magna maximus nec. Aliquam aliquet tincidunt enim vel rutrum. Ut augue lorem, rutrum et turpis in, molestie mollis nisi. Ut dapibus erat eget felis pulvinar, ac vestibulum augue bibendum. Quisque sagittis magna nisi. Sed aliquam porttitor fermentum. Nulla consequat justo eu nulla sollicitudin auctor. Sed porta enim non diam mollis, a ullamcorper dolor molestie. Nam eu ex non nisl viverra hendrerit. Donec ante augue, eleifend vel eleifend quis, laoreet volutpat ipsum. Integer viverra aliquam nulla, ac rutrum dui sodales nec</p>
        </section> */}    
      </main>
    </div>
  )
}
