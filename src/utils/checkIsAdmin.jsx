export const checkIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRole)) {
    return false;
  } else if (currentUser.userRole.includes("admin")) {
    return true;
  }
};
