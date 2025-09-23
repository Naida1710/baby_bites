# baby_bites


## Project Goals

**Baby Bites Blog** is a Full-Stack site designed for busy parents and caregivers who want to feed their babies well — but often don’t have the time, energy, or knowledge to prepare fresh, age-appropriate meals every day.
Introducing solids can be confusing and stressful. Between lack of sleep, returning to work, and managing household responsibilities, many parents find themselves asking:
- What should my baby eat at this age?
- Is this food safe?
- Do I have time to make something nutritious — or will it just be another pouch?
Baby Bites was created to solve these challenges. This platform provides simple, fast, and nutritious recipes tailored for babies aged 6 to 12 months, so parents can feel confident about feeding their little ones — even on the busiest days.
The goals of the project are to:
✅ Take the guesswork out of what to cook for babies at each age stage
✅ Offer quick and healthy recipes using everyday ingredients
✅ Support parents who want to feed their babies real food but feel overwhelmed or short on time
✅ Reduce the reliance on store-bought baby food by making homemade meals accessible
✅ Empower caregivers with clear, practical feeding guidance without the stress
✅ Build a supportive community where users can comment on recipes, ask questions, and share their own creations
✅ Encourage collaboration between parents, creating a space where real-life experiences and tips can be shared openly
By combining nutrition, convenience, and real-life practicality, Baby Bites helps parents turn mealtime into something simple, joyful, and nourishing — even when life is chaotic.

## Deployment

This project is deployed on [Heroku](https://www.heroku.com/). Follow these steps to deploy your own instance:

### 1. Prepare for Deployment

**Install Required Packages:**
- Open VS Code terminal (ensure virtual environment is activated).
- Run: `pip install whitenoise gunicorn`.
- Run: `pip freeze --local > requirements.txt`.
- This updates your requirements.txt with the new packages.

**Create Procfile:**
- In VS Code, right-click in the explorer panel (left sidebar).
- Select "New File".
- Name it exactly `Procfile` (no file extension).
- Add this content: `web: gunicorn my_project.wsgi`.
- Save the file.

**Update Settings.py:**
- Open `my_project/settings.py` in VS Code.
- Find the `ALLOWED_HOSTS` setting and update it to: `ALLOWED_HOSTS = [".herokuapp.com"]`.
- Add this line: `CSRF_TRUSTED_ORIGINS = ["https://*.herokuapp.com"]`.
- Find `DEBUG = True` and change it to: `DEBUG = False`.
- Save the file.

### 2. Heroku Setup

**Create Heroku Account:**
- Go to [heroku.com](https://www.heroku.com/).
- Click "Sign up" and create a new account.
- Verify your email address.

**Create New App:**
- Go to your Heroku dashboard.
- Click "New" → "Create new app".
- Enter a unique app name.
- Select "Common Runtime Europe" for location.
- Click "Create app".

**Connect GitHub Repository:**
- In your Heroku app dashboard, go to "Deploy" tab.
- Under "Deployment method", select "GitHub".
- Click "Connect to GitHub".
- Authorize Heroku to access your GitHub account.
- Search for your repository and click "Connect".

### 3. Configure Environment Variables

**Get Your Values Ready:**
- **SECRET_KEY**: Generate a new Django secret key or use your existing one.
- **Cloudinary Credentials**: Get these from your Cloudinary dashboard.

**Add Environment Variables:**
- In Heroku dashboard, go to "Settings" tab.
- Scroll down to "Config Vars" section.
- Click "Reveal Config Vars".
- Add each variable one by one:
  - `DATABASE_URL`: Provided by PostgreSQL.
  - `SECRET_KEY`: Your Django secret key.
  - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
  - `CLOUDINARY_API_KEY`: Your Cloudinary API key.
  - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

### 4. Deployment

**Deploy from GitHub:**
- In "Deploy" tab, scroll down to "Manual deploy" section.
- Select the main branch.
- Click "Deploy Branch".

Heroku deployment link: 


## Credits

### Data Sources

- **[Baby Foodie](https://babyfoode.com)- **[Healthy Mamma Kris](https://healthymamakris.com)- I was inspired by these two pages that I’ve been closely following since becoming a mom.

### Design Resources

- **[Canvas](https://canvas.com)** - Logo design and README file banner image.
- **[Pexels](https://pexels.com)** - User profile photos for testing and application use.
- **[Coolors](https://coolors.co)** - Color palette generation and selection.
- **[jQuery Timepicker](https://timepicker.co)** - Time selection plugin for appointment booking.
- **[Favicon.io](https://favicon.io/favicon-converter/)** - Favicon generation and conversion.

### Learning Resources

- **[Django Project](https://www.djangoproject.com/)** - Official Django documentation and framework.
- **[Think Therefore I Blog](https://learn.codeinstitute.net/)** - Django tutorial by code institute.

## Acknowledgements
* I would love to thank my husband for his immense support during a period that was not the easiest for anyone, especially since we were all exclusively sick for a month and a half. 
* I would also like to give a special thanks to the Student Support team at Code Institute for their incredible kindness and understanding.


