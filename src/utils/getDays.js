const getDays = (start, end) => {
  let arr = []
  let dt;
  for (arr=[], dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
    arr.push(new Date(dt));
  }
  return arr;
}

export default getDays

