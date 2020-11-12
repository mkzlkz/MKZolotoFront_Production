export const USER_NAV_LIST = require("./userNavs.json");
export const ADMIN_NAV_LIST = require("./adminNavs.json");

export const userRoles = [
  {id: 1, role: "admin"},
  {id: 2, role: "examiner"},
  {id: 3, role: "user"},
  {id: 4, role: "teacher"},
  {id: 5, role: "region"},
];

export const getUserData = () => localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

export const getUserRole = () => userRoles.find(i => i.id === getUserData().RoleID)

export const userAccessRoute = () => {
  const userRole = getUserRole();
  if (userRole.role === "user") {
    return USER_NAV_LIST.navs.filter(i => i.active)
  }
  return ADMIN_NAV_LIST.navs.filter(i => (i.access.indexOf(userRole.role) !== -1 && i.active));
}


export const timeFormatted = time => {
  let result = ''
  let h = Math.floor(time / 3600)
  h = h < 10 ? '0' + h : h
  let m = Math.floor((time - h * 3600) / 60)
  m = m < 10 ? '0' + m : m
  let s = (time - h * 3600 - m * 60)
  s = s < 10 ? '0' + s : s
  result += h ? h + ':' : ''
  result += m ? m + ':' : ''
  result += s
  return result
}
