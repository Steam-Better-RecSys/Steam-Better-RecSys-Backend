class StringClean {
    cleanString(s: string) {
        s = s
            .toLowerCase()
            .trim()
            .replace(/[^a-zA-Z0-9]+/g, '%')
        s = '%' + s + '%'
        return s
    }

    clearUsername(s: string) {
        s = s
            .toLowerCase()
            .trim()
            .replace(/[^a-zA-Z0-9]+/g, '')
        return s
    }
}

export default StringClean
