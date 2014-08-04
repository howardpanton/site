require 'eyes_selenium' 

    # This is your api key, make sure you use it in all your tests.
    Applitools::Eyes.api_key = '5OdRZD6ZnYwsWYQOOet8d1LpksB109EvtJVmVKnxC4R9g110' 
    eyes = Applitools::Eyes.new
    

    # Get a selenium web driver object.
    my_webdriver = Selenium::WebDriver.for :firefox 

    
    begin
    # Start visual testing using my_webdriver and setting the viewport to 1024x768.
    eyes.test(app_name: 'University of the Arts', test_name: 'UAL Home Page', viewport_size: {width: 1280, height: 868}, driver: my_webdriver) do |driver|
    width = 1280
    height = 868
 
    # Resize window. In Firefox and Chrome, must create a new window to do this.
    # http://groups.google.com/group/webdriver/browse_thread/thread/e4e987eeedfdb586
    case driver.capabilities[:browser_name]
      when 'firefox', 'chrome'
        handles = driver.window_handles
        driver.execute_script("window.open('about:blank','_blank','width=#{width},height=#{height}');")
        driver.switch_to.window((driver.window_handles - handles).pop)
        driver.execute_script("window.resizeTo(#{width}, #{height}); window.moveTo(0,1);")
      else
        driver.execute_script("window.resizeTo(#{width}, #{height}); window.moveTo(0,1);")
    end
    driver.get 'http://www.arts.ac.uk'
    # Visual validation point #1
    eyes.check_window('UAL Home')
    footer = driver.find_elements(:css, 'footer').last
    footer.location_once_scrolled_into_view
    driver.find_element(:css, ".col-link-lcf a").click
    # Visual validation point #2
    eyes.check_window('Fashion Page')
    end
    ensure
    my_webdriver.quit
    end 
