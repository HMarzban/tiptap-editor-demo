/** Demo document shown on first load (local sample only, not fetched). */
export const SAMPLE_DOCUMENT_HTML = `
<div style="text-align: center; margin-bottom: 2em;">
  <h1>🌌 Understanding Black Holes</h1>
  <p style="color: #666;">A Comprehensive Guide to Cosmic Phenomena</p>
  <p style="font-size: 14px; color: #666;">Physics Reference: PHY-COSM-2024-001</p>
</div>

<h2>ℹ️ Document Information</h2>
<table>
  <tr>
    <th>Classification</th>
    <td>Educational Resource</td>
    <th>Field</th>
    <td>Astrophysics</td>
  </tr>
  <tr>
    <th>Version</th>
    <td>3.2.1</td>
    <th>Last Updated</th>
    <td>March 15, 2024</td>
  </tr>
  <tr>
    <th>Reviewed By</th>
    <td>Dr. Sarah Chen, PhD</td>
    <th>Institution</th>
    <td>Institute of Cosmic Studies</td>
  </tr>
</table>

<h2>📝 Introduction</h2>
<p>Black holes represent one of the most fascinating phenomena in our universe. These cosmic objects are regions of spacetime where gravitational forces are so strong that nothing, not even light, can escape once it passes the event horizon.</p>

<div style="background: #f8f9fa; padding: 1em; border-left: 4px solid #0065FF; margin: 1em 0;">
  <p>💡 <strong>Key Concepts:</strong></p>
  <ul>
    <li>Event Horizon</li>
    <li>Singularity</li>
    <li>Hawking Radiation</li>
    <li>Gravitational Lensing</li>
  </ul>
</div>

<h2>🌟 Types of Black Holes</h2>
<table>
  <tr>
    <th>Classification</th>
    <th>Mass Range</th>
    <th>Origin</th>
    <th>Examples</th>
  </tr>
  <tr>
    <td>Stellar Black Holes</td>
    <td>3-10 M☉</td>
    <td>Stellar collapse</td>
    <td>Cygnus X-1</td>
  </tr>
  <tr>
    <td>Intermediate Mass</td>
    <td>100-100,000 M☉</td>
    <td>Stellar cluster merger</td>
    <td>HLX-1</td>
  </tr>
  <tr>
    <td>Supermassive</td>
    <td>>100,000 M☉</td>
    <td>Galaxy centers</td>
    <td>Sagittarius A*</td>
  </tr>
</table>

<h2>⚛️ Key Mathematical Concepts</h2>
<pre><code class="language-typescript">interface BlackHoleProperties {
  schwarzschildRadius: number;  // Rs = 2GM/c²
  mass: number;                 // Solar masses
  temperature: number;          // Hawking radiation
  surfaceGravity: number;      // At event horizon
}

const sagittariusA: BlackHoleProperties = {
  schwarzschildRadius: 12000000,  // In kilometers
  mass: 4.154e6,                 // Solar masses
  temperature: 1.2e-14,          // Kelvin
  surfaceGravity: 0.001          // m/s²
};</code></pre>

<h2>🎯 Current Research Areas</h2>
<ul data-type="taskList">
  <li data-checked="true" data-type="taskItem">
    <label><input type="checkbox" checked><span></span></label>
    <div>First image of black hole M87* <span style="color: #36B37E;">(Completed 2019)</span></div>
  </li>
  <li data-checked="true" data-type="taskItem">
    <label><input type="checkbox" checked><span></span></label>
    <div>Detection of gravitational waves <span style="color: #36B37E;">(LIGO, 2015)</span></div>
  </li>
  <li data-checked="false" data-type="taskItem">
    <label><input type="checkbox"><span></span></label>
    <div>Information paradox resolution <span style="color: #FF8B00;">(Ongoing Research)</span></div>
  </li>
  <li data-checked="false" data-type="taskItem">
    <label><input type="checkbox"><span></span></label>
    <div>Quantum gravity effects <span style="color: #0065FF;">(Theoretical Work)</span></div>
  </li>
</ul>

<h2>📊 Observable Properties</h2>
<h3>Event Horizon Properties</h3>
<div style="background: #f8f9fa; padding: 1em; border: 1px solid #ddd; border-radius: 4px;">
  <p><strong>Schwarzschild Radius Formula:</strong></p>
  <p style="text-align: center; font-size: 1.2em;">Rs = 2GM/c²</p>
  <p>Where:</p>
  <ul>
    <li>G = Gravitational constant</li>
    <li>M = Mass of the black hole</li>
    <li>c = Speed of light</li>
  </ul>
</div>

<h2>🖼️ Visual References</h2>
<p>First-ever image of a black hole (M87*):</p>
<img src="https://picsum.photos/800/400" alt="M87* Black Hole">
<p style="font-size: 12px; color: #666;">Figure 1: M87* black hole captured by the Event Horizon Telescope (2019)</p>

<h2>🌡️ Hawking Radiation</h2>
<div style="background: #fff3f3; padding: 1em; border: 1px solid #ff0000; border-radius: 4px; margin: 1em 0;">
  <p>🚨 <strong>Critical Concept:</strong></p>
  <p>Hawking radiation suggests that black holes aren't entirely "black" - they emit a tiny amount of thermal radiation. This leads to a fundamental paradox in quantum mechanics and general relativity.</p>
  <ul>
    <li>Temperature inversely proportional to mass</li>
    <li>Leads to eventual evaporation</li>
    <li>Challenges unitarity in quantum mechanics</li>
  </ul>
</div>

<h2>🔗 Further Reading</h2>
<ul>
  <li>📚 <a href="#">General Relativity Fundamentals</a></li>
  <li>🌌 <a href="#">Quantum Mechanics and Black Holes</a></li>
  <li>🔭 <a href="#">Observational Techniques</a></li>
  <li>📊 <a href="#">Data from Event Horizon Telescope</a></li>
</ul>

<hr>

<div style="background: #f8f9fa; padding: 1em; margin-top: 2em; font-size: 12px; color: #666;">
  <p>✍️ Document maintained by the Physics Education Team</p>
  <p>Last updated: March 15, 2024 | Peer reviewed by the International Astrophysics Committee</p>
  <p>For academic inquiries: <a href="mailto:physics@institute.edu">physics@institute.edu</a></p>
</div>
`;
