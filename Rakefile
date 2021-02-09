require 'html-proofer'
require 'rake/testtask'
require 'open-uri'

task :test do
  options = {
      :href_ignore => ["#"],
      :alt_ignore => [],
      :disable_external => true,
      :check_favicon => false,
      :parallel => { :in_processes => 4},
      :assume_extension => true,
      :typhoeus =>
        {
          :followlocation => true,
          :headers => {
            "User-Agent" => "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
            "Connection" => "close",
          },
          "cookiefile" => "/tmp/html_proofer_cookies",
          "cookiejar" => "/tmp/html_proofer_cookies",
          :connecttimeout => 120,
          :timeout => 120,
          :ssl_verifypeer => false,
          :ssl_verifyhost => 0
        },
      :hydra => { :max_concurrency => 10 },
  }

  HTMLProofer.check_directory("./_site", options).run
end

task :clean do
  rm_rf "./_site"
end

task :tidy do
  system 'find _site -name "*.html" -exec echo {} \; -exec tidy -errors -q {} \;'
end
