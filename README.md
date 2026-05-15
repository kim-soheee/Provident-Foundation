# Provident-Foundation
providentfoundation.ca ; myfoundation.ca ?

## Custom domain

This site is configured for `providentfoundation.ca` with one GitHub Pages `CNAME` file in the `pages/` folder.

In GitHub, go to the repository settings, then **Pages**, and set the custom domain to:

```text
providentfoundation.ca
```

At the domain registrar or DNS provider, add these records for the apex domain:

```text
Type  Name  Value
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

Optional but recommended for `www`:

```text
Type   Name  Value
CNAME  www   kim-soheee.github.io
```

After DNS has propagated, enable **Enforce HTTPS** in GitHub Pages.
