export const updateObj = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updatedObject
    }
}