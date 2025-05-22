import { NavLink, NavLinkProps, useLocation } from "react-router";

export default function QueryNavLink({to, ...props}: NavLinkProps & React.RefAttributes<HTMLAnchorElement>) {
  const location = useLocation()
  return (<NavLink to={to + location.search} {...props} />)
}