const arrArgs = (args) => {
    let regex = /'([^']*)'|\S+/g;
    let arr = args.match(regex);
    let newArr = arr.map(item => {
        return item.replace(/'/g, '');
    });

    return newArr;

}

export { arrArgs };