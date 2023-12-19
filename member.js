function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var projects = document.getElementById("projects");
    var contact = document.getElementById("contact");
    var home = document.getElementById("home");
    var memberBtn = document.getElementById("memberBtn");
    var skillsBtn = document.getElementById("skillsBtn");
    var projectsBtn = document.getElementById("projectsBtn");
    var contactBtn = document.getElementById("contactBtn");
    var homeBtn = document.getElementById("homeBtn");
    member.style.display = "block";
    skills.style.display = "none";
    projects.style.display = "none";
    contact.style.display = "none";
    home.style.display = "none";
    memberBtn.style.backgroundColor = "#f1f1f1";
    skillsBtn.style.backgroundColor = "#fff";
    projectsBtn.style.backgroundColor = "#fff";
    contactBtn.style.backgroundColor = "#fff";
    homeBtn.style.backgroundColor = "#fff";
}