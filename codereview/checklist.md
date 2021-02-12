
* **Readable and following standards** ?
  * style (ideally automated), [naming](http://arlobelshee.com/good-naming-is-a-process-not-a-single-step/) : variable/methods/class names
    * for basic stuff like [formatting](https://twitter.com/jpetazzo/status/1359611525246443521?s=20) : just use a linter/code formatter like [gofmt](https://golang.org/cmd/gofmt/), [prettier](https://prettier.io/), [black](https://black.readthedocs.io/en/stable/) ideally triggered at commit time.
    * There are only two hard things in Computer Science: cache invalidation and naming things. -- Phil Karlton
    * if you can't find a name, it does perhaps too much
    * http://blog.codinghorror.com/code-smells/
  * [squint test](http://robertheaton.com/2014/06/20/code-review-without-your-eyes/) and [single screen test](https://mestachs.wordpress.com/2012/11/26/through-the-eyes-of-sonar-complexity/)
  * no commented/test/debug/todo code left
  * follow guidelines/best practices depending of the technology reviewed
     * [Java](http://google.github.io/styleguide/javaguide.html) : use sonar to [enforce most of them](https://mestachs.wordpress.com/2013/12/23/through-the-eyes-of-sonar-recap/), [Maven](https://mestachs.wordpress.com/2012/05/17/maven-best-practices/)
     * [Javascript](https://github.com/airbnb/javascript/blob/master/README.md) : check [eslint](http://eslint.org/), [JQuery](http://lab.abhinayrathore.com/jquery-standards/), [React](https://github.com/airbnb/javascript/tree/master/react), [AngularJs](https://github.com/johnpapa/angular-styleguide#table-of-contents)
     * [Ruby](https://github.com/bbatsov/ruby-style-guide) (see rubocop or pullreview)
     * you should know when it's ok to deviate, tailor them for your team
  * Prefer coherence vs following blindly the current standard
     * if a code base is completly written with another standard (Service/Manager/Repository/Bean/Model/Presenter/Controller/Resources/…) stay in this standard, be coherent.
     * If it’s really a pain plan with your team if it should really be migrated to new standard.

* **Minimal and working solution** ?
  * to prove it's working the unit tests, integration tests should be updated
    * test at the right level
    * self contained, short, independent
    * follow [SetupExerciseVerifyTearDown](http://xunitpatterns.com/Four%20Phase%20Test.html)
    * use [assertj](http://joel-costigliola.github.io/assertj/) for meaningful error message
    * not too much mocks (god class under test)
    * good [coverage](http://eclemma.org/) (is my production code tested), 
    * good [mutation coverage](http://pitest.org/) (do I have good asserts/tests ?)
    * good data coverage (unicode, long/short/various case/empty, null, multiline,... Integer.MAX - 1)
    * no ignored/commented test
    * no off-by-one errors (we often messup of 1 in index/ < vs <= /...)
  * no obvious bug : classcast, npe,...
  * efficient
    * select n+1, missing index,...
  * meets requirements
    * explicit : story and analysis
    * implicit : i18n, IE 8, ... 
    * works with an ad-blocker enabled (don't use ad/ads or analytics in url domain/path)
  * impact the [expected parts](http://www.lornajane.net/posts/2015/code-reviews-before-you-even-run-the-code) of the system
    * concise change, not too much extra/unrelated changes
    * what is actually trying to be achieved, does it need to be done and is there a better (maybe completely different) way to do it
  * [Code smells](http://blog.codinghorror.com/code-smells/) ?
    * put the code where it [belongs](https://speakerdeck.com/vanakenm/code-trails?slide=29)
    * some of them are already detected at "readable" change.
    * no duplication : follow the [“three strikes”](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming)) rule
    * no use of deprecated api
  * Bug fix ? 
     * Does it fix the root cause or only the symptom ? [5-Whys](https://en.wikipedia.org/wiki/5_Whys)
     * Any other places where similar problems can arise ? (duplicated/similar usage pattern)
  * [DDD](http://www.infoq.com/minibooks/domain-driven-design-quickly) ? 
     * mostly/completely immutable, primitive obsession vs value objects
     * [checkRep](http://www.pgbovine.net/programming-with-rep-invariants.htm)
     * hexagonal architecture
  * Don't assume the earth is flat
     * network : http://blog.erratasec.com/2012/06/falsehoods-programmers-believe-about.html#.WA3ZC9WLRhG
     * time : [falsehoods](http://infiniteundo.com/post/25326999628/falsehoods-programmers-believe-about-time) and fallacyis(http://yourcalendricalfallacyis.com/), [utc is enough for everyone right ?](https://zachholman.com/talk/utc-is-enough-for-everyone-right)
     * address : https://www.mjt.me.uk/posts/falsehoods-programmers-believe-about-addresses/
     * geography : http://wiesmann.codiferes.net/wordpress/?p=15187
     * gis : http://www.atlefren.net/post/2014/09/falsehoods-programmers-believe-about-maps/
     * plenty of other falsehoods : https://github.com/kdeldycke/awesome-falsehood
     
* **Better than before** ?
  * boyscout rule : "Always leave the campground cleaner than you found it."
  * non regression or improvement in [SonarQube](http://www.sonarqube.org/), [PullReview](https://www.pullreview.com/),  [CodeClimate](https://codeclimate.com/),...
  * new tests, better readable tests

* **Production ready** ?
  * encoding
    * utf-8 everywhere !
  * migration won't break (not null without default, too big table to update)
    * require a maintenance window, significant downtime ?
    * https://github.com/mestachs/experiment/blob/master/codereview/migration_review_checklist.md
  * [error handling](https://mestachs.wordpress.com/2012/10/10/through-the-eyes-of-sonar-exception-handling/) :
    * close resources in finally
    * don't expose sensitive information to caller
    * exception logging with extra details
  * timeout, threadpool, connection pool : ideally adjustable
  * configuration is externalized and flexible with sensitive defaults and fail fast if bad config
  * unexpected dependency (in WEB-INF/lib, Gemfile,...) ?
    * pom change, [maven enforcer](https://maven.apache.org/enforcer/enforcer-rules/bannedDependencies.html), [pendantic pom enforcer](https://github.com/ferstl/pedantic-pom-enforcers#pedantic-pom-enforcers)
    * duplicate, new unnecessary jars, test jars, [duplicated classes](https://github.com/mestachs/archeo4j#archeo4j)
    * http://tattletale.jboss.org/
  * changelog/wiki/docker/ansible/... documentation/scripts updated
    * log in changelog and increment semver if incompatible change in public api
  * [secure](https://speakerdeck.com/mestachs/betatech-security-for-dummies?slide=38)
    * no clear vulnerabilities introduced or re-introduced (in [your code](https://www.owasp.org/images/f/fa/Code_Review_Guide_Pre-AlphaV2_(1).pdf) or a [dependency](https://www.owasp.org/index.php/OWASP_Dependency_Check))
    * prevent sql injection : PreparedStatement or ORM (no string concat)
    * prevent xss : 
      * escape user input in view rendering (c:out, fn:escapeXml, th:utext, html_safe)
      * specify [http header](https://www.owasp.org/index.php/List_of_useful_HTTP_headers), don't inline your js
    * improve security [awareness](http://www.ikangae.net/application-security/4-ways-to-improve-your-web-security/)
    * what if non ascii [username](https://github.com/reinderien/mimic) [Adm|n](https://www.reddit.com/r/programming/comments/1gl0zn/a_security_hole_via_unicode_usernames/)
    * [safe crypto usage ?](https://gist.github.com/paragonie-scott/e9319254c8ecbad4f227)
    * https://github.com/eliotsykes/rails-security-checklist
  * [load tested](https://speakerdeck.com/mestachs/gatling-load-testing-like-a-king) ?
    * resources leak (memory, connection, file descriptor, ...)
    * race condition, dead locks,...
    * performance
  * legal compliance
    * [privacy aspect](https://www.privacycommission.be/en) (Data protection and privacy ethical guidelines)
    * open source license compatible with [commercial usage](http://stackoverflow.com/a/27867740/613936) ?
    * commercial support advised, needed ?
     
more on the subject
 * http://kevinlondon.com/2015/05/05/code-review-best-practices.html
 * http://blog.codinghorror.com/code-reviews-just-do-it/
 * https://www.future-processing.pl/blog/another-code-review-best-practices/
 * http://blogs.atlassian.com/2010/03/code_review_in_agile_teams_part_ii/
 * http://blog.8thcolor.com/en/2014/04/5-reasons-you-are-not-doing-code-reviews/
 * http://blog.8thcolor.com/en/2013/10/we-dont-have-
 -for-code-reviews/
 * http://blog.fogcreek.com/increase-defect-detection-with-our-code-review-checklist-example/
 * http://smartbear.com/smartbear/media/pdfs/wp-cc-11-best-practices-of-peer-code-review.pdf
 * https://gist.github.com/bwest87/10049924
 * https://github.com/smartlogic/code-review-checklist
 * http://www.evoketechnologies.com/blog/code-review-checklist-perform-effective-code-reviews/
 * http://www.matthewjmiller.net/files/cc2e_checklists.pdf
 * https://www.youtube.com/watch?v=VRnMzMpSeag : How to stop wasting your time and start performing useful code reviews by Maria Khalusova
 * http://www.techrepublic.com/article/developers-guide-to-peer-reviews/
 * http://www.daedtech.com/creating-code-review-checklist/
 * http://verraes.net/2013/10/pre-merge-code-reviews/
 * http://www.savvyclutch.com/process/Make-Code-Review-Useful-Again/
 * https://github.com/brunofacca/zen-rails-security-checklist
 * https://sudo.isl.co/what-you-should-bring-to-a-code-review/ AMOP
 * https://medium.com/@vaidehijoshi/crafting-better-code-reviews-1a5fc00a9312
 * http://insights.dice.com/2012/10/31/whats-on-my-code-review-checklist/
 * https://mtlynch.io/human-code-reviews-1/
 * http://www.processimpact.com/articles/humanizing_reviews.html
 * https://developers.redhat.com/blog/2019/07/08/10-tips-for-reviewing-code-you-dont-like/
 * https://google.github.io/eng-practices/review/reviewer/
 * https://testing.googleblog.com/2019/11/code-health-respectful-reviews-useful.html
 * https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html
