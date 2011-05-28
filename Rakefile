require 'rubygems'
require 'rake'
require 'fileutils'

desc "Draft a new post"
task :new do
  puts "What should we call this post for now?"
  name = STDIN.gets.chomp
  system("git checkout -b #{name}")

  path = "_posts/#{name}.mkd"
  File.open(path, 'a') do |f|
    f.puts "---"
    f.puts "layout: post"
    f.puts "title: \"#{name}\""
    f.puts "---"
  end
  system("git add #{path}")
end

desc "Startup Jekyll"
task :start do
  edit_config("production", "false")
  sh "jekyll --server"
  edit_config("production", "true")
end

task :default => :start

## Helpers
## Thanks to https://github.com/dbarbosa/dbarbosa.me

def edit_config(option_name, value)
  config = File.read("_config.yml")
  regexp = Regexp.new('(^\s*' + option_name + '\s*:\s*)(\S+)(\s*)$')
  config.sub!(regexp,'\1'+value+'\3')
  File.open("_config.yml", 'w') {|f| f.write(config)}
end
