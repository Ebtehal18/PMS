import nodata from '../../../assets/data-pana.svg'
export default function NoData() {
  return <>
  <img src={nodata} alt="no-data" width={500} className='no-data'/>
  <h5>No data avaliable!</h5>
  </>;
}
