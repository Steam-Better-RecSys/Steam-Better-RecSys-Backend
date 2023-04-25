class Convertor {
    convertQueryToNumbers(arr: any): number[] {
        let numbers = []

        if (typeof arr == 'string') {
            numbers.push(Number(arr))
            return numbers
        }

        for (let i = 0; i < arr.length; i++) {
            numbers.push(Number(arr[i]))
        }

        return numbers
    }
}

export default Convertor
