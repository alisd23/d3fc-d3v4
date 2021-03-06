// returns the item from the given array that returns the least value from the accessor function
export default function minimum(data, accessor) {
    return data.map(function(dataPoint) {
        return [accessor(dataPoint), dataPoint];
    }).reduce(function(accumulator, dataPoint) {
        return accumulator[0] > dataPoint[0] ? dataPoint : accumulator;
    }, [Number.MAX_VALUE, null])[1];
}
