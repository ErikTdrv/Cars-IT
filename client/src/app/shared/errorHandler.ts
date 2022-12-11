export function handleError(error: any){
    if(error.includes('ValidationError')){
        return error.split(': ')[2]
    }else {
        return error
    }
}