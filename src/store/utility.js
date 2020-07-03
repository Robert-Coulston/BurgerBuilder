export const updateObject = (oldObject, updatedValues) => {
    console.log("Utility", oldObject, updatedValues);
    
    return {...oldObject, ...updatedValues}
}