
after generating the migration ask your self 
   * null: false ?
   * default value (specialy for boolean)
   * foreign key ?
   * uniqueness ?
   * index ?
   * don't use the directly app/model but embeds the needed models in the migration
   
during development is my db consistent with my model (or review)
   * nullalign: https://thomasleecopeland.com/2017/09/28/announcing-nullalign.html
   * foreignkeys: https://github.com/jenseng/immigrant
   * consistency_fail: https://8thlight.com/blog/colin-jones/2011/06/10/winning-at-consistency.html
