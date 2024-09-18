

function html(template, ...props){

    let [prop1, prop2]= props
    debugger
 

}





function template(strings, ...keys) {
    return (...values) => {
      const dict = values[values.length - 1] || {};
      const result = [strings[0]];
      keys.forEach((key, i) => {
        const value = Number.isInteger(key) ? values[key] : dict[key];
        result.push(value, strings[i + 1]);
      });
      return result.join("");
    };
  }
  

  // Tagged template literal function to render HTML
function html(strings, ...values) {
    // Combine the strings and values into a single HTML string
    const htmlString = strings.reduce((result, str, i) => {
        const value = values[i] ? values[i] : '';
        return result + str + value;
    });
  
    // Create a new template element
    const template = document.createElement('template');
  
    // Set the innerHTML of the template element to the constructed HTML string
    template.innerHTML = htmlString.trim();
  
    // Return the content of the template as a DocumentFragment
    return template.content.cloneNode(true);
  }
  
  // Example usage of the html tagged template literal function
  const count = 10;
  const element = html`<div>
    <p>Current count: ${count}</p>
    <button onclick="alert('Count is ${count}')">Show Count</button>
  </div>`;