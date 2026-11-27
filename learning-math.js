/* Deterministic teaching calculations. No image recognition, requests or model calls. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.LearningMath=api;})(globalThis,()=>{
  function align(reference,prediction){
    const a=Array.from(reference),b=Array.from(prediction),n=a.length,m=b.length;
    const dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
    for(let i=0;i<=n;i++)dp[i][0]=i;for(let j=0;j<=m;j++)dp[0][j]=j;
    for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    const operations=[];let i=n,j=m,S=0,D=0,I=0;
    while(i||j){
      if(i&&j&&a[i-1]===b[j-1]&&dp[i][j]===dp[i-1][j-1]){operations.push({kind:'equal',a:a[--i],b:b[--j]});}
      else if(i&&j&&dp[i][j]===dp[i-1][j-1]+1){S++;operations.push({kind:'substitute',a:a[--i],b:b[--j]});}
      else if(i&&dp[i][j]===dp[i-1][j]+1){D++;operations.push({kind:'delete',a:a[--i],b:''});}
      else {I++;operations.push({kind:'insert',a:'',b:b[--j]});}
    }
    return {S,D,I,N:n,distance:dp[n][m],cer:n?dp[n][m]/n:null,operations:operations.reverse()};
  }
  function select(rows,threshold){
    const kept=rows.filter(r=>Number.isFinite(r.score)&&r.score>=threshold);
    const errors=kept.filter(r=>r.correct===false).length;
    return {total:rows.length,kept:kept.length,errors,coverage:rows.length?kept.length/rows.length:null,risk:kept.length?errors/kept.length:null,ids:kept.map(r=>r.id)};
  }
  return {align,select};
});
