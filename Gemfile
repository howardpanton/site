# Why use bundler?
# Well, not all development dependencies install on all rubies. Moreover, `gem
# install sinatra --development` doesn't work, as it will also try to install
# development dependencies of our dependencies, and those are not conflict free.
# So, here we are, `bundle install`.
#
# If you have issues with a gem: `bundle install --without-coffee-script`.

source 'https://rubygems.org'

group :development do
	gem 'sass'
	gem 'jekyll'
  	gem 'guard'
  	gem 'guard-sass'
  	gem 'guard-jekyll'
end
