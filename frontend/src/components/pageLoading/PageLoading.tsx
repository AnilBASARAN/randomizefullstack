import ReactLoading from 'react-loading'
const PageLoading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ReactLoading
        type={'spin'}
        color={'#0d6efd'}
        height={'7%'}
        width={'7%'}
        className="translate-y-[-50%]"
      />
    </div>
  )
}

export default PageLoading