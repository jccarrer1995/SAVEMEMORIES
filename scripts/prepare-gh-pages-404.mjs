import { readFileSync, writeFileSync } from 'node:fs'

const redirect = `<script type="text/javascript">
  var pathSegmentsToKeep = 1;
  var l = window.location;
  l.replace(
    l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
    l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash
  );
</script>`

const html = readFileSync('dist/404.html', 'utf8')
writeFileSync('dist/404.html', html.replace('<head>', `<head>${redirect}`))
