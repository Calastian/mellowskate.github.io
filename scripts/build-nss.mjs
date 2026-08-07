import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

const ROOT = path.resolve(import.meta.dirname, '..')
const NSS_DIR = path.join(ROOT, 'Website-nss')
const OUTPUT_DIR = path.join(ROOT, 'public', 'projects', 'website-nss')
const VIEWS_DIR = path.join(NSS_DIR, 'views')
const PARTIALS_DIR = path.join(VIEWS_DIR, 'partials')
const LAYOUTS_DIR = path.join(VIEWS_DIR, 'layouts')
const PUBLIC_DIR = path.join(NSS_DIR, 'public')

const PAGE_DATA = {
  home: {
    title: 'Home',
    pageTitle: 'Nano Software Services - Technology Solutions & Expert Services',
    pageDescription:
      'Expert software development, AI solutions, custom PC builds, streaming setups, and technology consulting.',
    pageCSS: ['home'],
    canonical: '/',
    isHomePage: true,
  },
  about: {
    title: 'About',
    pageTitle: 'About Nano Software Services - Our Story & Mission',
    pageDescription:
      'Learn about Nano Software Services LLC and our commitment to excellence.',
    pageCSS: ['about'],
    canonical: '/about',
  },
  services: {
    title: 'Services',
    pageTitle: 'Computer Repair & Website Design Services',
    pageDescription:
      'Expert computer repair, virus removal, hardware diagnostics, and professional website design services.',
    pageCSS: ['services'],
    canonical: '/services',
  },
  support: {
    title: 'Support',
    pageTitle: 'Technical Support - Get Help with Your Technology Solutions',
    pageDescription:
      'Need help? Our expert support team is here to assist you.',
    pageCSS: ['support'],
    canonical: '/support',
  },
  login: {
    title: 'Login',
    pageTitle: 'Login - Access Your Account',
    pageDescription:
      'Sign in to your Nano Software Services account.',
    pageCSS: ['login'],
    canonical: '/login',
  },
  register: {
    title: 'Register',
    pageTitle: 'Create Account - Join Nano Software Services',
    pageDescription:
      'Create your Nano Software Services account.',
    pageCSS: ['register'],
    canonical: '/register',
  },
}

function rewriteUrls(html) {
  return html
    .replace(/<meta http-equiv="X-Frame-Options" content="DENY">/g, '')
    .replace(/(href|src)="\/css\//g, '$1="css/')
    .replace(/(href|src)="\/js\//g, '$1="js/')
    .replace(/(href|src)="\/images\//g, '$1="images/')
    .replace(/href="\/site\.webmanifest"/g, 'href="site.webmanifest"')
    .replace(/href="\/robots\.txt"/g, 'href="robots.txt"')
    .replace(/href="\/about"/g, 'href="about.html"')
    .replace(/href="\/home"/g, 'href="index.html"')
    .replace(/href="\/services"/g, 'href="services.html"')
    .replace(/href="\/services#/g, 'href="services.html#')
    .replace(/href="\/support"/g, 'href="support.html"')
    .replace(/href="\/login"/g, 'href="login.html"')
    .replace(/href="\/register"/g, 'href="register.html"')
    .replace(/href="\/"/g, 'href="index.html"')
    .replace(/href="\/privacy"/g, 'href="#"')
    .replace(/href="\/terms"/g, 'href="#"')
    .replace(/href="\/cookies"/g, 'href="#"')
    .replace(/href="\/docs"/g, 'href="#"')
    .replace(/href="\/tutorials"/g, 'href="#"')
    .replace(/href="\/community"/g, 'href="#"')
    .replace(/action="\/support"/g, 'action="#" onsubmit="alert(\'This form is disabled in demo mode.\'); return false"')
    .replace(/action="\/login"/g, 'action="#" onsubmit="alert(\'This form is disabled in demo mode.\'); return false"')
    .replace(/action="\/register"/g, 'action="#" onsubmit="alert(\'This form is disabled in demo mode.\'); return false"')
    .replace(/action="POST"/g, 'action="#"')
}

async function main() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true })
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const navbarSource = fs.readFileSync(
    path.join(PARTIALS_DIR, 'navbar.handlebars'), 'utf-8'
  )
  const footerSource = fs.readFileSync(
    path.join(PARTIALS_DIR, 'footer.handlebars'), 'utf-8'
  )
  handlebars.registerPartial('navbar', navbarSource)
  handlebars.registerPartial('footer', footerSource)

  const layoutSource = fs.readFileSync(
    path.join(LAYOUTS_DIR, 'main.handlebars'), 'utf-8'
  )
  const layoutTemplate = handlebars.compile(layoutSource)

  const PAGES = [
    { name: 'home', template: 'home.handlebars', out: 'index.html' },
    { name: 'about', template: 'about.handlebars', out: 'about.html' },
    { name: 'services', template: 'services.handlebars', out: 'services.html' },
    { name: 'support', template: 'support.handlebars', out: 'support.html' },
    { name: 'login', template: 'login.handlebars', out: 'login.html' },
    { name: 'register', template: 'register.handlebars', out: 'register.html' },
  ]

  for (const { name, template, out } of PAGES) {
    const viewSource = fs.readFileSync(
      path.join(VIEWS_DIR, template), 'utf-8'
    )
    const viewTemplate = handlebars.compile(viewSource)
    const data = PAGE_DATA[name] || { title: name, pageCSS: [name] }
    const bodyHtml = viewTemplate(data)
    const fullHtml = layoutTemplate({ ...data, body: bodyHtml })
    const final = rewriteUrls(fullHtml)
    fs.writeFileSync(path.join(OUTPUT_DIR, out), final)
    console.log(`  ✓ ${out}`)
  }

  const source404 = fs.readFileSync(
    path.join(VIEWS_DIR, '404.handlebars'), 'utf-8'
  )
  const rendered404 = source404.replace(/href="\/"/g, 'href="index.html"')
  fs.writeFileSync(path.join(OUTPUT_DIR, '404.html'), rendered404)
  console.log('  ✓ 404.html')

  function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true })
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }

  console.log('\nCopying static assets...')
  copyDir(PUBLIC_DIR, OUTPUT_DIR)
  console.log('  ✓ css/')
  console.log('  ✓ js/')
  console.log('  ✓ images/')

  console.log('\nDone! Output in public/projects/website-nss/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
