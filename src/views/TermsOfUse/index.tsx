import React, { useState, useEffect } from 'react'
import styled from 'styled-components'; 

const StyleBase = styled.div``

const Wrapper = styled(StyleBase)<{isMobile?: boolean}>`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  ${({isMobile}) => isMobile ?  'min-width' : '' }: 1440px;
  background: #000000;
  color: #FFFFFF;
`

const TermsOfUse =  styled(StyleBase)<{isMobile?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({isMobile}) => isMobile ?  '1312px' : '100%' };
  height: ${({isMobile}) => isMobile ?  '784px' : '623px' };
  background: linear-gradient(110.46deg, rgba(18, 25, 40, 0.9) 31.56%, rgba(15, 23, 40, 0.9) 99.56%);
  box-shadow: 0px 0px 40px rgba(0, 5, 17, 0.23);
  border-radius: 20px;
  margin-top: ${({isMobile}) => isMobile ?  '80px' : '20px' };
  height: 100%;
  >.context {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    margin-top: 64px;
    .ktou-box {
      display: flex;
      justify-content: start;
      align-items: center;
      flex-direction: column;
      width: ${({isMobile}) => isMobile ?  '1088px' : '100%' };
      ${({isMobile}) => isMobile ?  'height' : '' }: 528px;
      margin-top: ${({isMobile}) => isMobile ?  '76px' : '52px' };
      background: #1A2130;
      border: 1px solid #1E2635;
      border-radius: 20px;
      padding: ${({isMobile}) => isMobile ?  '48px 0' : '24px 0%' };
      .ktou {
        // margin-top: 48px;
      }
      .ktou-context {
        padding: 0 40px;
        height: 100%;
        overflow-x: clip;
        overflow-y: scroll;
        /*---滚动条默认显示样式--*/ 
        ::-webkit-scrollbar-thumb{ 
          background-color:#018EE8; 
          height:50px; 
          outline-offset:-2px; 
          outline:2px solid #fff; 
          -webkit-border-radius:4px; 
          border: 2px solid #fff; 
        }
      
        /*---鼠标点击滚动条显示样式--*/ 
        ::-webkit-scrollbar-thumb:hover{ 
          background-color:#FB4446; 
          height:50px; 
          -webkit-border-radius:4px; 
        }
      
        /*---滚动条大小--*/ 
        ::-webkit-scrollbar{ 
          width:2px; 
          height:2px; 
        }
      
        /*---滚动框背景样式--*/ 
        ::-webkit-scrollbar-track-piece{ 
          background-color:#2A303E; 
          -webkit-border-radius:0; 
        }
        .tou {
          margin-top: 32px;
        }
        .z-ktou {
          margin-top: 20px;
          text-align: center;
        }
        .wtk {
          margin-top: 20px;
        }
        .wet { 
          margin-top: 20px;
        }
      }
    }
  }
`

export default function Index() {
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 760px)').matches,
  );

  useEffect(() => {
    window
      .matchMedia('(min-width: 760px)')
      .addEventListener('change', (e) => {
        setMatches(e.matches)
      });
  }, []);

  return (
    <Wrapper>
      {/* <main className='roll'>
        <div className='main' />
      </main> */}
          <TermsOfUse isMobile={matches}>
            <div className='context'>
              <div className={matches?'text-title':'h5-text-title'}>Terms of use</div>
              <div className='ktou-box'>
                <div className='ktou-context text-context16'>
                  <div className={matches?'z-ktou text-h3':'z-ktou h5-text-h3'}>Kisaragi Terms of use</div>
                  <div className='wtk'>
                    {`
                      この利用規約（以下、「本規約」といいます。）は、（以下、「当事業者」といいます。）が提供するNFTの販売サービス（以下、「本サービス」といいます。）の利用条件を定めるものです。ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って本サービスをご利用いただきます。

                      第1条 （適用）
                      1.本規約は、ユーザーと当事業者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                      2.当事業者は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）を設定することがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
                      3.本規約の定めが前項の個別規定の定めと矛盾する場合には、個別規定において特段の定めなき限り、個別規定の定めが優先されるものとします。
                      4.ユーザーは、本サービスを利用されるにあたって、本規約の全文をお読みいただいた上で、本規約に同意いただく必要があります。
                      5.ユーザーは、本サービスを実際に利用することによって本規約に有効かつ取消不能な同意をしたものとみなされます。
                      6.ユーザーが未成年者である場合は、親権者など法定代理人の同意を得たうえで本サービスを利用してください。
                      
                      第2条（本サービスの内容）
                      本サービスは、当事業者が提供するウェブサイト（https://guildqb.com)及び同サイトよりリンクするウェブサイトを指し、以下、「本ウェブサイト」と総称する。）を通じて、当事業者から、ユーザーに対し、NFT（Non-Fungible Token）（ブロックチェーン技術を用いてブロックチェーン上で発行されるトークンのうち、固有の値や属性を持たせた代替性のないトークンをいいます。）を販売するサービスです（以下、本サービス上で販売される NFT を「本NFT」といいます。）。
                      
                      第3条 （ウォレットの利用）
                      1.本サービスを利用して本NFTを購入するためにはウォレット（NFTを保管、管理、閲覧等するためのツールをいいます。）をユーザーが自ら保有している必要があります。
                      2.ユーザーは、本サービスの利用にあたり、自身のウォレットに関する情報、その他本サービスの利用に伴い使用する一切の情報（以下「ウォレット情報等」といいます。）を不正に利用されないよう自らの責任において適切に管理するものとします。
                      3. 当事業者は、ウォレット情報等が第三者に利用されたことによってユーザーその他第三者に生じた損害については、当事業者の責めによる場合を除いて一切責任を負いません。
                      4. 当事業者は、ウォレット情報等を使用してなされた行為を、当該ウォレット情報等を管理すべきユーザーによる行為とみなすことができるものとします。
                      
                      第4条（ユーザーへの通知・連絡）
                      1.当事業者がユーザーに対して通知又は連絡を行うときは、当該ユーザーの届出内容に基づき、電子メール、郵便、電話、ファックス等の方法から当事業者が適当と判断した方法で行います。
                      2.当事業者が、前項に定める方法により通知を行った場合、ユーザーは当該通知を受領したものとみなします。
                      
                      第4条 （売買契約）
                      1.ユーザーは、当事業者所定の方法により本NFTの購入を申し込むものとし、本ウェブサイト上に表示された本NFTの価格に相当するETHその他の暗号資産（当事業者が指定する暗号資産に限られます）を当事業者が定めるアドレスに送付し、当事業者が当該暗号資産を現に受領した時点で、本NFTに関する売買契約（以下「本契約」といい、本契約におけるユーザーを「購入者」とします。）が成立するものとします。
                      2.当事業者は、購入者（本NFTが第三者に譲渡された場合は当該第三者。以下本項において同じ。）に対し、当該購入者が購入した本NFTについて、以下の各号に定める行為を行うことを許諾します。
                      ① 本NFTに紐づけられた文章、画像、プログラムその他のコンテンツ（以下、「コンテンツ」といいます。）にアクセスし、鑑賞し、または、私的使用目的で複製すること
                      ② 本NFTに紐づけられたコンテンツを個人のSNSアカウントに投稿し、公開すること
                      ③ 本NFTを第三者に譲渡すること
                      ④ 前各号の他、個別規定で定めた行為、及び当事業者が明示的に許諾した行為
                      3.購入者は、第三者に対し、本NFTを譲渡する場合、当該第三者に対し、本規約及び個別規定に定める条件と同等の条件を課すものとし、また、購入者は、当該譲渡後は前項の許諾に基づく権利を失うものとします。
                      4.本NFTの購入に際して必要となる、ブロックチェーンネットワークを利用する際に支払う手数料（以下、「ガス代」といいます。）は、ユーザーが負担するものとします。トランザクションエラー、ブロックチェーンネットワークの不具合その他当事業者の責めに帰さない事由により、当事業者がETHその他の暗号資産を受領できなかった場合にユーザーが支出したガス代についても同様とします。
                      5.当事業者は、購入者に対し、ブロックチェーン上に本NFT及びその購入に係る一定の記録をし、購入者のウォレットアドレスに本NFTを送付するものとし、これをもって当事業者による本契約の履行が完了するものとします。
                      6. 購入者は、本契約等成立後は、法律に定め（強行法規に限る。）がある場合を除き、いかなる理由があっても成立した本契約の無効または取消しを主張しないものとし、当事業者は、返品及び返金には応じないものとします。
                      
                      第5条（本サービスの利用に関する責任）
                      1.ユーザーは、本サービス中の各コンテンツ、アドバイス等の一切の情報について、自己の判断と責任において本サービスを利用するものとします。
                      2.ユーザーは、本サービスの利用に関連し、第三者に対して損害を与え、当該第三者から何らかの請求を受けたときは、自己の責任と費用において解決します。
                      3. ユーザーは、本サービスが利用可能な機器、通信手段等を、ユーザーの費用と責任で用意しなければなりません。
                      
                      第6条 （知的財産権）
                      1.本NFTに係る創作物及び本サービスを通じて提供され又は本サービスを構成する文章、画像、プログラムその他一切の情報（以下「本コンテンツ」と総称します。）に係る知的財産権（著作権、特許権、実用新案権、意匠権、商標権その他の知的財産権（それらの権利を取得し、又はそれらの権利につき登録等を出願する権利を含みます。）をいいます。以下同じです。）は、当事業者又は当該権利を有する第三者に帰属しています。当事業者による本サービスの利用を許す行為及び本NFTの引渡しは、これらの権利の移転とは解釈されないものとします。
                      2.当事業者は、購入者が本NFT及び本NFTに係る創作物を利用して第三者に対して投稿、送信、掲載等した文章、画像、映像、プログラム、データその他の情報（以下「ユーザー・マテリアル」といいます。）について、本NFT、本サービス又は当事業者の広告宣伝を目的として、形式、媒体を問わずあらゆる様態で利用等（使用、配信、複製、修正、表示、出版等を含むがこの限りではありません。）し、また第三者に当該利用等を許諾することができるものとします。
                      3.購入者は、当事業者及び前項に定める第三者によるユーザー・マテリアルの利用等を、無償、無期限かつ無条件で許諾するものとし、当事業者及び当該第三者によるユーザー・マテリアルの適正な使用に関し、著作者人格権を含むいかなる請求権も行使しないものとします。
                      4.ユーザー・マテリアルに関して当事業者に許諾された権利は、本サービスの終了後においても存続するものとします。
                      5.購入者は、ユーザー・マテリアル及び当事業者によるユーザー・マテリアルの本規約に基づく利用が、第三者の知的財産権、プライバシー権、肖像権その他の人格権又は人格的利益を侵害しないことを保証するものとします。
                      6.購入者は、ユーザー・マテリアルに関して第三者から苦情の申立て、訴訟の提起その他の紛争が生じた場合、自身の責任と費用によりこれを解決するものとします。
                      
                      第7条 （禁止事項）
                      ユーザーは、本サービスの利用にあたり、以下の行為をしてはならないものとします。
                      ① 法令または公序良俗に違反する行為
                      ② 犯罪行為若しくは犯罪に結びつく行為またはこれらの行為を援助若しくは助長する行為
                      ③ 本サービスに含まれる著作権、商標権その他の知的財産権を侵害する行為
                      ④ 当事業者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                      ⑤ 本サービスによって得られた情報（本NFT及びコンテンツを含む。）を商業的に利用する行為
                      ⑥ 当事業者のサービスの運営を妨害するおそれのある行為
                      ⑦ 不正アクセスをし、またはこれを試みる行為
                      ⑧ 他のユーザーに関する個人情報等を収集または蓄積する行為
                      ⑨ 他のユーザーに成りすます行為
                      ⑩ 当事業者のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
                      ⑪ マネー・ローンダリング、テロ資金供与もしくは経済制裁関係法令等（OFAC規制を含みます。以下同じです。）に抵触する取引に利用する目的で本NFTを保有し、または本サービスをマネー・ローンダリング、テロ資金供与もしくは経済制裁関係法令等に抵触する取引に利用する行為。なお、OFAC規制とは、OFAC（米国財務省外国資産管理室）ホームページ（英文）に記載の規制をいうものとします。
                      ⑫ その他、当事業者が不適切と判断する行為
                      
                      第8条 （本サービスの変更、中止、終了等）
                      1.当事業者は、本サービスの内容を事前の予告なく変更・追加・削除することができるものとします。なお、内容の変更等に関する情報は、原則として本ウェブサイト等に掲載します。
                      2.当事業者は、以下各号のいずれかに該当する場合には、自らの判断で、本サービスの全部又は一部の提供を中止又は中断することができます。この場合、当事業者は合理的な方法でユーザーにその旨を通知するものとしますが、緊急に中断する必要が生じた場合等、やむを得ない事情により通知できない場合は、この限りではありません。
                      ① 天災地変等の不可抗力、通信回線等の障害、過度なアクセス集中、不正アクセス等により、本サービスの提供ができない場合
                      ② 本サービスの提供にかかるシステムの点検、保守等の作業を行う場合
                      ③ その他円滑な本サービス提供のために、当事業者が必要と判断した場合
                      3. 当事業者は、本ウェブサイト上に情報を掲載することにより、本サービスの提供を終了することができます。
                      4. 当事業者は、本条に基づく本サービスの提供の変更、中断、停止若しくは終了、その他本サービスの利用に関連して、ユーザーが不利益を被ったとしても、当事業者の故意又は重大な過失に起因する場合を除き、当事業者は損害賠償責任及びその他の責任を負いません。
                      
                      第9条 (ユーザー提供情報の取扱)
                      1.当事業者は、ユーザーが本サービスの利用によって提供ないし届け出る情報（ユーザーのアクセス履歴及び本サービス内の操作履歴等の利用状況及び通信に関する情報を含み、以下「ユーザー提供情報」といいます。）を、収集する場合があります。
                      2.当事業者は、収集したユーザー提供情報に関し、本サービスの円滑な運営、改善、当事業者や本サービスの宣伝告知等（第三者のメディアへの掲載を通じた紹介記事・コンテンツ等も含まれます。）又は当事業者による新サービスの研究開発や本NFTの販売促進等を目的として、あらゆる態様で利用し、又は統計情報等の特定の個人を識別できない形態に加工した上で、第三者に提供することがあります。
                      
                      第10条 (個人情報の取扱)
                      1.当事業者は、ユーザーの本サービスの利用に伴って取得した個人情報を以下の目的で利用します。
                      （１）ユーザー向け特典や本サービスの提供･運用･管理
                      （２）当事業者が運営する各種イベント、サービス等に関する情報提供・案内の送付
                      （３）本サービスに関するお問合せ対応
                      （４）アンケート依頼（第三者の商品・サービスに関するものも含みます）
                      （５）当事業者が運営するサービスや市場調査、新サービス及び新商品の研究開発
                      （６）当事業者の製品や当事業者が運営するサービス・イベントの内容改善による利便性の向上、並びに会員に対して興味・関心度の高い情報の適切なタイミングでの提供
                      （７）統計情報または匿名加工情報への加工、およびその利用
                      （８）その他上記の各目的に準じた利用目的
                      2.当事業者は、当事業者の業務の一部又は全部を委託するに伴って、ユーザーの個人情報を委託先に提供することがあります。その場合、委託先との間で秘密保持契約等を締結し、必要な措置を講じます。
                      
                      第11条 (終了時等の情報の取扱い)
                      1.当事業者は、本サービスの提供を終了した場合又はユーザーが本サービスの利用を終了した場合には、何らの通知承諾なくユーザー提供情報その他の当事業者が当該ユーザーに関して保有する情報を削除できるものとし、また当該情報の管理及び返却を行う義務を負わないものとします。
                      2.当事業者は、何らの通知承諾なく、前項の情報を、特定の個人を識別できない形態に加工したうえで、利用、管理又は提供することができるものとします
                      
                      第12条 （反社会的勢力の排除）
                      ユーザーは、当事業者に対し、以下各号に定める事項を誓約するものとします。
                      ① 自ら及び自らの重要な取引先が暴力団、暴力団関係企業、政治活動標ぼうゴロ、特殊知能暴力集団、組織的犯罪集団及びこれらに準ずる団体並びにこれらの構成員等（以下総称して「反社会的勢力」という。）ではないこと。
                      ② 反社会的勢力が、直接であること間接であることを問わず自らの経営に関与していないこと。
                      ③ 名目を問わず反社会的勢力に資金提供を行っておらず、又は反社会的勢力であることを知りながら取引又は交流をもっていないこと。また、今後もこれらを行わないこと。
                      ④ その他反社会的勢力との間で社会的に非難されるべき関係を有していないこと。
                      ⑤ 自ら又は第三者を利用した、脅迫的な言動又は暴力を用いた要求行為、偽計又は威力を用いた業務妨害又は信用を毀損する行為及び当事業者又は第三者に対する法的な責任を超えた不当な要求行為を行わないこと。
                      
                      第13条 (広告又は宣伝)
                      1.当事業者は、本サービスの利用の際に表示される広告若しくは宣伝内容につき、広告主の実在、住所その他の広告に関する情報の内容に関し、ユーザーに対し、何らの責任も負わないものとします。
                      2.ユーザーは、本サービスの利用の際に表示される広告若しくは宣伝に起因して、損害を被った場合若しくは紛争が生じた場合は、自らの責任と費用において広告主との間で解決するものとし、当事業者は何らの責任も負わないものとします。
                      3.当事業者は、本サービスの利用の際に表示される広告若しくは宣伝の内容に関してのお問合せに応じる義務を負わないものとします。
                      4.本サービスにおいて転送される当事業者の他のコンテンツ及び広告がある場合には、リンク先コンテンツの規約等が優先されます。
                      5.当事業者は、前各項に定める他、本サービスの利用の際に転送される当事業者が運営しないウェブサイト、サービス等における広告又は宣伝の内容全般については、何らの責任も負わないものとします。
                      
                      第14条 （保証の否認および免責事項）
                      1.当事業者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを保証しておりません。
                      2.本サービスに関する瑕疵（セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないこと、ならびに安全性、信頼性、正確性、完全性、有効性および特定の目的への適合性を明示的にも黙示的にも保証しておりません。当事業者は、ユーザーに対して、かかる瑕疵を除去して本サービスを提供する義務を負いません。
                      3.当事業者は、ユーザーが本サービスを通じて購入する本NFTの資産価値を保証いたしません。
                      4.当事業者は、本サービスが全ての機種端末および機種端末のOSのバージョンに対応していることを保証するものではありません。ユーザーは、本サービスの利用に供する機種端末のOSのバージョンアップ等に伴い、本サービスの動作に不具合が生じる可能性があることにつき、あらかじめ了承するものとします。また、当事業者は、かかる不具合が生じた場合に当事業者が行うプログラムの修正等により、当該不具合が解消されることを保証するものではありません。
                      5.本サービスに関する当事業者とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されませんが、この場合であっても、当事業者は、当事業者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当事業者またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。
                      6.当事業者は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
                      
                      第15条（当事業者の免責）
                      1.当事業者は、次の各号に掲げる損害については、当事業者に故意または重大な過失がある場合を除き、一切の責任を負わないものとします。
                      (1) 天災地変、政変等の事由により、本NFTの送付手続き等が遅延し、または不能となったことにより生じた損害
                      (2) サイバー攻撃等により、本NFTの流通が機能不全に陥ったことにより生じた損害
                      (3) 各国政府の法令等、行政機関のガイドライン、規制等の新設・改廃または自主規制機関の規制等の新設・改廃により生じた損害
                      (4) 電信、インターネットまたは郵便の誤謬または遅延等の事由（インターネット回線の混雑を含みます。）により生じた損害
                      (5) ユーザーのコンピューターのハードウエアやソフトウエアの故障・誤作動、当事業者のコンピューターシステムやソフトウエアの故障・誤作動、市場関係者や第三者が提供するシステム・オンライン・ソフトウエアの故障・誤作動等その他取引に関係する一切のコンピューターのハードウエア・ソフトウエア・システム・オンラインの故障や誤作動により生じた損害
                      (6) ユーザーが正確な情報を入力しなかったことまたはユーザーが必要な確認を怠ったために生じた損害
                      (7) 本サービスによりユーザーに提供された情報が正確性を欠いていたことにより生じた損害
                      (8) ユーザーが本サービスを利用して得られる数値、ニュース等の情報に関連して生じた損害
                      (9) その他当社の責めによらない事由により生じた損害
                      2.本サービスのウェブサイトから他のウェブサイトへのリンクまたは他のウェブサイトから当事業者ウェブサイトへのリンクが提供されている場合でも、当事業者は、本サービスのウェブサイト外のウェブサイトおよびそこから得られる情報に関してその正確性、完全性を保証するものではなく、当該情報に基づきユーザーに生じた損害について、当事業者に故意または重大な過失がある場合を除き、一切の責任を負わないものとします。
                      3.当事業者は、ユーザーによる、本NFTの性質、メカニズムおよびマーケット運営等の理解不足から発生するいかなる損害について、当事業者に故意または重大な過失がある場合を除き、一切の責任を負わないものとします。
                      4.当事業者は、本NFTに対する法令等もしくは関連した消費税を含む税制の将来の制定または変更により利用者に損害が発生した場合であっても、当該ユーザーに対してその損害を賠償する責任を負わないものとします。
                      5.当事業者は、当の過失（重大な過失を除きます。）による債務不履行責任または不法行為責任については、逸失利益その他の特別の事情によって生じた損害を賠償する責任を負わず、通常生ずべき損害の範囲内で、かつ、1万円を上限として損害賠償責任を負うものとします。
                      
                      第16条 （権利義務の譲渡の禁止）
                      ユーザーは、当事業者の書面による事前の承諾なく、本契約上の地位または本契約若しくは本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
                      
                      第17条 （規約の変更）
                      1.当事業者は、民法第548条の4の規定に基づき、本規約を変更できるものとします。
                      2.当事業者は、本規約を変更する場合、本規約を変更する旨、変更内容および効力発生時期を本ウェブサイトへの掲載による公表その他適切な方法により周知するものとし、当該効力発生時期を経過した後にユーザーが本サービスを利用した場合、本規約の変更に同意したものとみなします。
                      
                      第18条 （準拠法・裁判管轄）
                      1.本規約の解釈にあたっては、日本法を準拠法とします。
                      2.本規約または本契約に起因または関連して生じた一切の訴訟その他の一切の紛争については、大阪地方裁判所を第一審の専属的合意管轄裁判所とします。
                      以上
                    `}
                  </div>
                  {/* <div className='wet'>
                    {`
                      We employ the use of cookies. By accessing Kisaragi.com, you agreed to the use of cookies in accordance with the Kisaragi's Privacy Policy.Most  user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                    `}
                  </div> */}
                </div>
              </div>
            </div>
          </TermsOfUse>
    </Wrapper>
  )
}