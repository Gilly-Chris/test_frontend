
export const upldateDomList = (domList, userCategeries) => {
    const updatedOptionElementStrings = [];
    const contentRegex = /<option.*?>(.*?)<\/option>/s;
    const userValues = userCategeries.map(item  => parseInt(item))
    for (const optionElementString of domList) {
        const value = parseInt(optionElementString.match(/value="(.*?)"/)[1]);
        const content = optionElementString.match(contentRegex)[1];
        const isSelected = userValues.includes(value);
        let updatedOptionElementString = `<option value="${value}"`;
        if (isSelected) {
            updatedOptionElementString += ' selected';
        } 
        updatedOptionElementString += `>${content}</option>`;
    
        updatedOptionElementStrings.push(updatedOptionElementString);
    }
    return updatedOptionElementStrings
}


