<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"15px",
marginTop:"20px"
}}
>

<div style={cardStyle}>
<h3>Status</h3>
<p>{result.status}</p>
</div>

<div style={cardStyle}>
<h3>SEO Score</h3>
<p>{result.seo_score}/100</p>
</div>

<div style={cardStyle}>
<h3>Response Time</h3>
<p>{result.response_time}</p>
</div>

<div style={cardStyle}>
<h3>Word Count</h3>
<p>{result.word_count}</p>
</div>

<div style={cardStyle}>
<h3>HTTPS</h3>
<p>{result.https_enabled ? "✅ Enabled":"❌ Disabled"}</p>
</div>

<div style={cardStyle}>
<h3>Robots.txt</h3>
<p>{result.robots_txt ? "✅ Found":"❌ Missing"}</p>
</div>

</div>