use tech_blog_db;

show tables;

describe user;

describe post;

describe comment;

INSERT INTO user(username,twitter,github,email,password) 
VALUES('james','james Twitter','jamesGit','james5@gmail.com','testt12345'),
('alex','alex Twitter','alex Git','alex@gmail.com','testt12345'),
('john','john Twitter','johnGit','john@gmail.com','testt12345');





INSERT INTO post(title,post_content,user_id,created_at,updated_at) 
VALUES('1. How to do FACTORIAL of 5 in javascript? ','var factorial=(num)=>{
                        
                                            var res=1
                                        
                                            for(var i=num;i>1;i--){
                                                res = res*i
                                            }
                                            return res
                                        }
                                        num=5
                                        console.log(factorial(num))',1,'2023-07-27','2023-07-28'),
('2. How to find maximum number in an array arr=[1,2,9,7,5]','var maxNum = (arr)=>{
                                            var max = arr[0];
                                            // var max=0
                                        
                                            for (var i = 0; i < arr.length; i++) {
                                            var currentNum = arr[i];

                                            console.log(`curre num ${currentNum} max is ${max}`)
                                            
                                            if (currentNum > max) {
                                                max = currentNum;
                                            }
                                            }
                                            return max;
                                        };


                                        var arr =[1,2,9,7,5]
                                        console.log(maxNum(arr))
                                        


                                        (or) 
                                        


                                        const maxNum=(arr)=>{
                                            const res = Math.max(...arr)

                                            return res
                                        }
                                        
                                        var arr =[1,2,9,7,5]
                                        console.log(maxNum(arr))',1,'2023-07-27','2023-07-28'),
('3. How to find PALINDROME of a string','var palindrome=(str)=>{
                                            var revStr=str.split('').reverse().join('')
                                            console.log(revStr)
                                        
                                            if(revStr === str){
                                                return true
                                            }
                                            return false
                                        }
                                        
                                        str=`madam`
                                        console.log(palindrome(str))',1,'2023-07-27','2023-07-28');







INSERT INTO comment(user_id,post_id,comment_text,created_at,updated_at) 
VALUES(1,1,'User1 is my 1st blog comment','2023-07-27','2023-07-28'),
(1,1,'User1 is my 1111t blog comment','2023-07-27','2023-07-28'),
(1,1,'User1 is my 222 blog comment','2023-07-27','2023-07-28'),
(2,2,'User2 is my 2nd blog comment','2023-07-27','2023-07-28'),
(3,3,'User3 is my 3rd blog comment','2023-07-27','2023-07-28');





-- divyaportfolio

-- mysql -u root -p
-- password

-- npm start

-- source schema.sql

-- source seeds.sql;

-- source select.sql;

