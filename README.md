# react-socket-io-chat-app

<h3>How to Run Application</h3>

<em>Prerequisites<em>
<ul>
  <li>Nodejs</li>
  <li>NPM</li>
</ul>
<h3>Project Structure</h3>

<span>Server is located directly inside of SRC in the root directory</span>
<span>React is running inside a views folder inside of SRC</span>

<h3>How to start Express Socketio Server</h3>

<span>Run 'npm install' to install dependencies</span>
<span>Run 'npm run dev' to start dev server</span>
<span>Port is set to 8081 by default but can be changed dynamically by adding DOTENV file</span>

<h3>How to start React APP</h3>

<p>Change directories into src -> views -> chat-room</p>
<p>Run 'yarn' or 'npm install' to install project dependencies</p>
<p>Inside of App.js we are declaring a variable called 'ENDPOINT'. This must be the URL to your Express socket server. Eg. http://localhost:8081</p>
<p>Run 'npm run start' and that will start the React server on port 3000</p>

<h3>How to use</h3>

<p>All you need to do is enter your name and a room ID. That easy. </p>
