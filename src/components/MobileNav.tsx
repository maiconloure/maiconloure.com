import { createSignal, For } from 'solid-js'

type NavLink = { href: string; label: string }

export default function MobileNav(props: { links: NavLink[]; currentPath: string }) {
  const [open, setOpen] = createSignal(false)

  const isActive = (href: string) =>
    href === '/' ? props.currentPath === '/' : props.currentPath.startsWith(href)

  return (
    <>
      <button
        type="button"
        class="nav-toggle"
        aria-expanded={open()}
        aria-controls="nav-links"
        onClick={() => setOpen(!open())}
      >
        <span class="sr-only">Toggle navigation</span>
        <span class="nav-toggle-bars" aria-hidden="true" />
      </button>
      <ul id="nav-links" class="nav-links" classList={{ open: open() }}>
        <For each={props.links}>
          {(link) => (
            <li>
              <a href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
                {link.label}
              </a>
            </li>
          )}
        </For>
      </ul>
    </>
  )
}
