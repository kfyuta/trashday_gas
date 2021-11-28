# trashday_gas
Notify you may throw away trash today via LINE.
For example, If today is 1st Thursday, this app notify you may throw away trash "paper and cloth". 
(LINEでゴミ捨て日を通知する)

## Table Structure(テーブル構造) 
### ゴミ収集テーブル
| trash_type(ゴミ種別) | nth_week(回収週) | day(回収曜日)　|
:---:|:---:|:---: 
|燃やすゴミ	|9	|Tuesday（火曜日)
|燃やすゴミ	|9	|Friday(金曜日)
|plastic(プラスチックゴミ)	|9	|Wednesday(水曜日)
|plastic bottle(ペットボトル)	|9	|Wednesday(水曜日)
|燃やさないゴミ	|2	|Monday(月曜日)
|燃やさないゴミ	|4	|Monday(月曜日)
|有害ゴミ	|2	|Monday(月曜日)
|有害ゴミ	|4	|Monday(月曜日)
|bottle(ビン)	|1	|Monday(月曜日)
|bottle(ビン)	|3	|Monday(月曜日)
|can(カン)	|2	|Thursday(木曜日)
|can(カン)	|4	|Thursday(木曜日)
|paper and cloth(紙・布)	|1	|Thursday(木曜日)
|paper and cloth(紙・布)	|3	|Thursday(木曜日)

#### 凡例
| 回収週 | 意味 |
:---:|:---: 
|１	|1st week(１週目)
|2	|2nd week(２週目)	
|3	|3rd week(３週目)
|4	|4th week(４週目)
|9  |every week(毎週)
