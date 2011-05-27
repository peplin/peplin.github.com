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
  sh "jekyll --server"
end

task :default => :start
