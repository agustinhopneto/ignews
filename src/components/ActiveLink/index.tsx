import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useMemo, cloneElement } from "react";
import styles from './styles.module.scss';

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = useMemo(() => asPath === rest.href ? styles.active : '', 
    [asPath, rest.href]
  );
  
  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  )
}