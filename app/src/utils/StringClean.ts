class StringClean {
    cleanString(s: string) {
        s = s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '%_')
        s = s + '%'
        return s
    }
}

export default StringClean
