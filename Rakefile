require 'html-proofer'
require 'rake/testtask'
require 'open-uri'

task :test do
  options = {
      :href_ignore => ["#"],
      :alt_ignore => [
      ],
      :disable_external => true,
      :check_favicon => false,
      :parallel => { :in_processes => 4},
      :assume_extension => true
  }

  HTMLProofer.check_directory("./_site", options).run
end

task :clean do
  rm_rf "./_site"
end

task :tidy do
  system 'find _site -name "*.html" -exec echo {} \; -exec tidy -errors -q {} \;'
end
