const express = require('express');
const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let recordedVideoPath = null;

app.post('/start-recording', async (req, res) => {
    try {
        // Initiate puppeteer
        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        // Record this video file
        const recorder = new PuppeteerScreenRecorder(page);

        // Start the recording
        await recorder.start("mp4.mp4");

        // Navigate to the local URL of the Vue project
        await page.goto("http://localhost:8080");

        // Optionally, wait for the button to become visible
        await page.waitForSelector('#start-recording-btn');

        // Click the button to trigger some action
        await page.click('#start-recording-btn');


        // await page.waitForTimeout(5000); 

        // Stop the recording
        await recorder.stop();

        // Close the browser
        await browser.close();

        // Save the path of the recorded video
        recordedVideoPath = 'output.mp4';

        res.sendStatus(200);
    } catch (error) {
        console.error('Error starting recording:', error);
        res.status(500).json({ error: 'Error starting recording. Please check the server logs for details.' });
    }
});

app.get('/download-video', (req, res) => {
    try {
        if (recordedVideoPath) {
            // Stream the video file for download
            const fileStream = fs.createReadStream(recordedVideoPath);
            res.setHeader('Content-Type', 'video/mp4');
            res.setHeader('Content-Disposition', 'attachment; filename=output.mp4');
            fileStream.pipe(res);
        } else {
            res.status(404).send('No recorded video available for download.');
        }
    } catch (error) {
        console.error('Error downloading video:', error);
        res.status(500).json({ error: 'Error downloading video. Please check the server logs for details.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





// const express = require('express');
// const puppeteer = require('puppeteer');
// const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// app.post('/start-recording', async (req, res) => {
//     try {
//         // Initiate puppeteer
//         const browser = await puppeteer.launch({
//             headless: true // Run Chrome in headless mode
//         });

//         const page = await browser.newPage();

//         // Record this video file
//         const recorder = new PuppeteerScreenRecorder(page);

//         // Start the recording
//         await recorder.start("ll.mp4");

//         // Navigate to the deployed site
//         // await page.goto("https://custom-div-editor-tool.vercel.app/");

//         await page.goto("https://google.com");

//         // Stop the recording
//         await recorder.stop();

//         // Close the browser
//         await browser.close();

//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error starting recording:', error);
//         res.status(500).json({ error: 'Error starting recording. Please check the server logs for details.' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });







// const express = require('express');
// const puppeteer = require('puppeteer');
// const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// app.post('/start-recording', async (req, res) => {
//     try {
//         // Initiate puppeteer
//         const browser = await puppeteer.launch({
//             headless: true // Run Chrome in headless mode
//         });

//         const page = await browser.newPage();

//         // Record this video file
//         const recorder = new PuppeteerScreenRecorder(page);

//         // Start the recording
//         await recorder.start("output.mp4");

//         // Navigate to the local URL of your Vue project
//         await page.goto("http://localhost:8080");

//         // Optionally, wait for the button to become visible
//         await page.waitForSelector('#start-recording-btn');

//         // Click the button to trigger some action
//         await page.click('#start-recording-btn');

//         // Optionally, wait for some time for the action to take effect
//         // await page.waitForTimeout(5000);

//         // Stop the recording
//         await recorder.stop();

//         // Close the browser
//         await browser.close();

//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error starting recording:', error);
//         res.status(500).json({ error: 'Error starting recording. Please check the server logs for details.' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
