import SignInCard from '../partials/signin/SignInCard';

function SignIn() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Cards */}
            <div className="flex items-center justify-center">
              <SignInCard></SignInCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SignIn;
