guard 'compass' do
  watch(%r{(.*)\.s[ac]ss$})
end

guard 'jekyll' do
  watch /^.*\.(htm|html|xml|js|css|ttf|eot|woff|jpg|svg)/
  ignore %r{^_site/}, %r{/assets/styles/}, %r{/.sass-cache/}
end
