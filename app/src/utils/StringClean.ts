class StringClean {
    cleanString(s: string) {
        s = s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '%_')
        s = '%_' + s + '%'
        return s
    }
}

export default StringClean
